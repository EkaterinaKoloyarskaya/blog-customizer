import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group';
import { fontFamilyOptions, defaultArticleState, OptionType, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, ArticleStateType } from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';

type articleParamsFormProps = {
	onApply: (newSettings: ArticleStateType) => void;
	onReset: (newSettings: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ onApply, onReset }: articleParamsFormProps) => {

	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	function handleIsOpenForm() {
		setIsOpen(!isOpen)
	}

	const [formState, setFormState] = useState(defaultArticleState);

	const updateFormField = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[field]: value,
			}));
		};
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onApply(formState);
	}

	function handleReset(e: React.FormEvent) {
		e.preventDefault();
		setFormState(defaultArticleState);
		onReset(defaultArticleState);
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleIsOpenForm} />
			<aside ref={rootRef} className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Select title='Шрифт' options={fontFamilyOptions} selected={formState.fontFamilyOption} onChange={updateFormField('fontFamilyOption')} />
					<RadioGroup title='Размер шрифта' name='font-size' options={fontSizeOptions} selected={formState.fontSizeOption} onChange={updateFormField('fontSizeOption')} />
					<Select title='Цвет шрифта' options={fontColors} selected={formState.fontColor} onChange={updateFormField('fontColor')} />
					<Separator />
					<Select title='Цвет фона' options={backgroundColors} selected={formState.backgroundColor} onChange={updateFormField('backgroundColor')} />
					<Select title='Ширина контента' options={contentWidthArr} selected={formState.contentWidth} onChange={updateFormField('contentWidth')} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

