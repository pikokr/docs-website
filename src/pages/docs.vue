<template>
	<div>
		<div class="lg:flex mx-auto w-full max-w-screen-2xl">
			<Sidebar />
			<router-view v-if="docs" :key="$route.path" />
			<div v-else-if="fetchError" class="mx-auto py-16 sm:px-8 lg:py-8 w-full text-center dark:text-gray-200">
				Couldn't load the documentation data.
				<pre>{{ fetchError.toString() }}</pre>
			</div>
			<Spinner v-else />
		</div>

		<BackToTop v-if="showBackToTop" />
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { whenever, useEventListener, useMagicKeys } from '@vueuse/core';

import { useStore } from '~/store';
import JejudoSource from '~/data/JejudoSource';
import CTSSource from '~/data/CTSSource';
import { fetchError } from '~/util/fetchError';

import Sidebar from '~/components/Sidebar.vue';
import Spinner from '~/components/Spinner.vue';
import BackToTop from '~/components/BackToTop.vue';

const router = useRouter();
const route = useRoute();
const store = useStore();
const { Ctrl_K } = useMagicKeys({
	passive: false,
	onEventFired(e) {
		if (e.ctrlKey && e.key === 'k' && e.type === 'keydown') {
			e.preventDefault();
		}
	},
});

const sources = reactive({
	[JejudoSource.id]: JejudoSource,
	[CTSSource.id]: CTSSource
});

const showBackToTop = ref(false);

const source = computed(() => store.state.source);
const tag = computed(() => store.state.tag);
const docs = computed(() => store.state.docs);

onMounted(() => {
	const containerElement = document.getElementById('container');
	useEventListener(containerElement, 'scroll', () => {
		if (containerElement && containerElement.scrollTop > 300) {
			showBackToTop.value = true;
		} else {
			showBackToTop.value = false;
		}
	});
});

whenever(Ctrl_K, () => {
	document.getElementById('search')?.focus();
});

const watchRoute = async () => {
	if (route.path === '/') return;
	if (
		route.params.source &&
		route.params.tag &&
		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		(docs.value?.id !== sources[route.params.source].id || docs.value?.tag !== route.params.tag)
	) {
		await store.dispatch({
			type: 'fetchDocs',
			// @ts-expect-error
			inputSource: sources[route.params.source] ?? JejudoSource,
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			inputTag: route.params.tag ?? tag.value,
		});

		// @ts-expect-error
		await store.dispatch({ type: 'fetchTags', currentSource: sources[route.params.source] ?? JejudoSource });
	}

	// @ts-expect-error
	if (route.params.source && sources[route.params.source]) {
		store.commit({
			type: 'setSource',
			// @ts-expect-error
			source: sources[route.params.source],
		});
	} else {
		return router.replace({
			name: 'docs-source-tag-category-file',
			params: {
				source: JejudoSource.id,
				tag: JejudoSource.defaultTag,
				category: JejudoSource.defaultFile.category,
				file: JejudoSource.defaultFile.id,
			},
		});
	}

	// Set the tag, or redirect to a default route
	if (route.params.tag) {
		store.commit({
			type: 'setTag',
			tag: route.params.tag,
		});
		store.commit({
			type: 'setSource',
			// @ts-expect-error
			source: sources[route.params.source],
		});
	} else {
		return router.replace({
			name: 'docs-source-tag-category-file',
			params: {
				source: source.value?.id ?? JejudoSource.id,
				tag: source.value?.recentTag || source.value?.defaultTag,
				category: source.value?.defaultFile.category ?? JejudoSource.defaultFile.category,
				file: source.value?.defaultFile.id ?? JejudoSource.defaultFile.id,
			},
		});
	}

	// Redirect to a default route
	if (!route.params.file && !route.params.class && !route.params.typedef && route.name !== 'docs-source-tag-search') {
		return router.replace({
			name: 'docs-source-tag-category-file',
			params: {
				source: source.value?.id ?? JejudoSource.id,
				tag: tag.value ?? JejudoSource.defaultTag,
				category: source.value?.defaultFile.category ?? JejudoSource.defaultFile.category,
				file: source.value?.defaultFile.id ?? JejudoSource.defaultFile.id,
			},
		});
	}
};

watchEffect(() => void watchRoute());
</script>
