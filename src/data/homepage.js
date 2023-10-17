const lightStyles = {
	sectionStyles: {
		headerTextColorClass: 'secondary-color',
		bgColorClass: '',
	},
	blogStyles: {
		titleColorClass: 'primary-color',
		descColorClass: 'primary-color',
		detailsColorClass: 'primary-color',
		commentBgClass: 'primary-bg',
		commentColorClass: 'light-color',
		commentIconFillClass: 'light-color',
	},
};

const darkStyles = {
	sectionStyles: {
		headerTextColorClass: 'light-color',
		bgColorClass: 'primary-bg',
	},
	blogStyles: {
		titleColorClass: 'light-color',
		descColorClass: 'light-color',
		detailsColorClass: 'light-color',
		commentBgClass: 'light-bg',
		commentColorClass: 'primary-color',
		commentIconFillClass: 'primary-color',
	},
};

const goldenStyles = {
	sectionStyles: {
		headerTextColorClass: 'primary-color',
		bgColorClass: 'accent-bg',
	},
	blogStyles: {
		titleColorClass: 'primary-color',
		descColorClass: 'primary-color',
		detailsColorClass: 'primary-color',
		commentBgClass: 'primary-bg',
		commentColorClass: 'light-color',
		commentIconFillClass: 'light-color',
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
