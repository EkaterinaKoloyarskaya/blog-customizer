import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, fontFamilyOptions, OptionType, ArticleStateType } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {

const [settings, setSettings] = useState(defaultArticleState);

function applySettings(newSettings: ArticleStateType) {
	setSettings(newSettings);
}

function resetSettings(newSettings: ArticleStateType) {
	setSettings(defaultArticleState);
}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={applySettings} onReset={resetSettings}/>
			<Article />
		</main>
	);
};
