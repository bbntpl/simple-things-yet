import { defineStore } from 'pinia';
import { computed, ref, unref } from 'vue';

import { extractIds } from '@/utils/helpers';
import { fetchTagById, fetchTagBySlug, fetchTags } from '@/api/tagService';

// eslint-disable-next-line max-lines-per-function
export const useTagsStore = defineStore('tags', () => {
	const tags = ref([]);
	const status = ref('idle');

	function changeStatusTo(newValue) {
		if (status.value !== 'fully-fetched') {
			status.value = newValue;
		}
	}

	async function addAllTags() {
		changeStatusTo('loading');
		try {
			const fetchedTags = await fetchTags({
				sort: 'asc',
				excludeIds: extractIds(unref(tags.value)),
			});
			tags.value.push(...fetchedTags);
			changeStatusTo('fully-fetched');
		} catch (err) {
			changeStatusTo('failed');
			console.error('Failed to fetch tags', err);
			throw err;
		}
	}

	async function addTagById(tagId) {
		changeStatusTo('loading');
		try {
			const fetchedTag = await fetchTagById(tagId);
			tags.value.push(fetchedTag);
			changeStatusTo('succeeded');
		} catch (err) {
			changeStatusTo('failed');
			throw err;
		}
	}

	async function addTagBySlug(tagSlug) {
		changeStatusTo('loading');
		try {
			const fetchedTag = await fetchTagBySlug(tagSlug);
			tags.value.push(fetchedTag);
			changeStatusTo('succeeded');
		} catch (err) {
			changeStatusTo('failed');
			throw err;
		}
	}

	const getTagById = computed(() => {
		return (id) => tags.value.find((tag) => tag.id === id);
	});

	const getTagBySlug = computed(() => {
		return (slug) => tags.value.find((tag) => tag.slug === slug);
	});

	const isReadyToFetch = computed(
		() => status.value === 'idle' || status.value === 'succeeded',
	);

	return {
		tags,
		addAllTags,
		addTagById,
		addTagBySlug,
		getTagById,
		getTagBySlug,
		isReadyToFetch,
	};
});
