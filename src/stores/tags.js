import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { extractIds } from '@/utils/helpers';
import { fetchTagById, fetchTags } from '@/api/tagService';

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
				excludeIds: extractIds(rawTags),
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

	const getTagById = computed(() => {
		return (id) => tags.value.find((tag) => tag.id === id);
	});

	const isReadyForFetch = computed(
		() => status.value === 'idle' || status.value === 'succeeded',
	);

	const rawTags = computed(() => tags.value);

	return {
		tags,
		addAllTags,
		addTagById,
		getTagById,
		isReadyForFetch,
		rawTags,
	};
});