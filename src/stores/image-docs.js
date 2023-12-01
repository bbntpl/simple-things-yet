/* eslint-disable max-lines-per-function */
import { getImageUrl } from '@/api';
import { fetchImageDoc } from '@/api/imageDocService';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useImageDocsStore = defineStore('imagedocs', () => {
	const imageDocs = ref([]);
	const status = ref('idle');

	async function addImageDocById(imageId) {
		status.value = 'loading';
		try {
			const fetchedImageDoc = await fetchImageDoc(imageId);
			imageDocs.value.push({
				credit: fetchedImageDoc.credit,
				id: imageId,
				fileName: fetchedImageDoc.fileName,
				imageUrl: getImageUrl(imageId),
			});
			status.value = 'succeeded';
		} catch (err) {
			status.value = 'failed';
			throw err;
		}
	}

	const getImageDocById = computed(() => {
		return (imageId) =>
			imageDocs.value.find((imageDoc) => imageDoc.id === imageId);
	});

	const isReadyToFetch = computed(() => {
		return status.value === 'idle' || status.value === 'succeeded';
	});

	return {
		status,
		imageDocs,
		isReadyToFetch,
		getImageDocById,
		addImageDocById,
	};
});
