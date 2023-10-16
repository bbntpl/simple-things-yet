const lightStyles = {
	sectionStyles: {
		headerTextColor: 'secondary-text',
		bgColorClass: '',
	},
	blogStyles: {
		titleColorClass: 'primary-text',
		descColorClass: 'shark-text',
		detailsColorClass: 'shark-text',
	},
};

const darkStyles = {
	sectionStyles: {
		headerTextColor: 'highlight-text',
		bgColorClass: 'primary-background',
	},
	blogStyles: {
		titleColorClass: 'light-text',
		descColorClass: 'light-text',
		detailsColorClass: 'light-text',
	},
};

const goldenStyles = {
	sectionStyles: {
		headerTextColor: 'primary-text',
		bgColorClass: 'golden-background',
	},
	blogStyles: {
		titleColorClass: 'primary-text',
		descColorClass: 'primary-text',
		detailsColorClass: 'primary-text',
	},
};

const homepageSectionsStyles = [
	darkStyles,
	lightStyles,
	goldenStyles,
	lightStyles,
	darkStyles,
	lightStyles,
];

export default homepageSectionsStyles;
export { darkStyles, lightStyles, goldenStyles };
