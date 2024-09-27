import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';
import React from 'react';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	//Состояние стилей страницы
	const [formStates, setFormStates] = React.useState({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	});
	//Передаваемя в дочерний элемент функция для обновления состояния стилей на страниче
	const updateFormStates = (data: Record<string, OptionType>) => {
		setFormStates({
			'--font-family': data.selectFont.value,
			'--font-size': data.selectFontSize.value,
			'--font-color': data.selectColor.value,
			'--container-width': data.selectContainerWidth.value,
			'--bg-color': data.selectBackgroundColor.value,
		});
	};

	return (
		<div className={clsx(styles.main)} style={formStates as CSSProperties}>
			<ArticleParamsForm updateFormStates={updateFormStates} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
