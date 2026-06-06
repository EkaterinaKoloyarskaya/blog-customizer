import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group';
import { fontFamilyOptions, defaultArticleState, OptionType, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, ArticleStateType } from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type articleParamsFormProps = {
	onApply: (newSettings: ArticleStateType) => void;
	onReset: (newSettings: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ onApply, onReset }: articleParamsFormProps) => {

	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	function handleIsOpenForm() {
		setIsOpen(!isOpen)
	}

	const [selected, setSelected] = useState(defaultArticleState);
	function handleFontFamilyChange(option: OptionType) {
		setSelected({ ...selected, fontFamilyOption: option })
	}

	function handleFontSizeOptions(option: OptionType) {
		setSelected({ ...selected, fontSizeOption: option })
	}

	function handleFontColors(option: OptionType) {
		setSelected({ ...selected, fontColor: option })
	}

	function handleBackgroundColors(option: OptionType) {
		setSelected({ ...selected, backgroundColor: option })
	}

	function handleContentWidthArr(option: OptionType) {
		setSelected({ ...selected, contentWidth: option })
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onApply(selected);
	}

	function handleReset(e: React.FormEvent) {
		e.preventDefault();
		setSelected(defaultArticleState);
		onReset(defaultArticleState);
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleIsOpenForm} />
			<aside ref={rootRef} className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Select title='Шрифт' options={fontFamilyOptions} selected={selected.fontFamilyOption} onChange={handleFontFamilyChange} />
					<RadioGroup title='Размер шрифта' name='font-size' options={fontSizeOptions} selected={selected.fontSizeOption} onChange={handleFontSizeOptions} />
					<Select title='Цвет шрифта' options={fontColors} selected={selected.fontColor} onChange={handleFontColors} />
					<Select title='Цвет фона' options={backgroundColors} selected={selected.backgroundColor} onChange={handleBackgroundColors} />
					<Select title='Ширина контента' options={contentWidthArr} selected={selected.contentWidth} onChange={handleContentWidthArr} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

