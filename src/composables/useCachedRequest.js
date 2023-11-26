import { onScopeDispose, ref, unref, watchEffect } from 'vue';

// eslint-disable-next-line max-lines-per-function
export function useCachedRequest(getter, args) {
	const data = ref();
	const isLoading = ref(false);
	const isReady = ref(false);
	const error = ref(undefined);

	const cache = new Map();

	onScopeDispose(() => {
		cache.clear();
	});

	watchEffect(async () => {
		const key = unref(args);
		isReady.value = false;
		isLoading.value = true;

		try {
			if (cache.has(key)) {
				data.value = cache.get(key);
				isReady.value = true;
			}

			const newData = await getter(key);
			cache.set(key, newData);
			data.value = newData;
			isReady.value = true;
		} catch (err) {
			error.value = err;
		} finally {
			isLoading.value = false;
		}
	});

	return { data, error, isLoading, isReady };
}
