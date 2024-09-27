import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import React, { FormEvent, useEffect } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

export type ArticleParamsFormType = {
	updateFormStates: (data: Record<string, OptionType>) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormType) => {
	// Реф сайдбара
	const sidebarRef = React.useRef<HTMLElement>(null);

	// Состояние сайдбара и кнопки со стрелкой
	const [isOpen, isOpenSetState] = React.useState<Boolean>(false);

	// Передаваемая функция для переключения состояния кнопки ArrowButton
	const toogleSidebar = (): void => {
		isOpenSetState(!isOpen);
	};

	// Отлов клика за пределами сайдбара и закрытие сайдбара по этому клику
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				isOpenSetState(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Дефолтные значения селекторов стилей
	const defaultValues = {
		selectFont: defaultArticleState.fontFamilyOption,
		selectFontSize: defaultArticleState.fontSizeOption,
		selectColor: defaultArticleState.fontColor,
		selectContainerWidth: defaultArticleState.contentWidth,
		selectBackgroundColor: defaultArticleState.backgroundColor,
	};

	// Стейт данных полученных из формы
	const [formData, setFormData] = React.useState(defaultValues);

	// Функция сброса формы в исходное состояние
	const handleReset = (event: FormEvent) => {
		event.preventDefault();
		setFormData(defaultValues);
		props.updateFormStates(defaultValues);
	};
	// Функция установки выбранных значений в форме в стили на страницу
	const handleSumbit = (event: FormEvent) => {
		event.preventDefault();
		props.updateFormStates(formData);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toogleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSumbit}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={formData.selectFont}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selectedFont) => {
							setFormData({ ...formData, selectFont: selectedFont });
						}}
					/>
					<RadioGroup
						name='fontSizeRadio'
						selected={formData.selectFontSize}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(selectedFontSize) => {
							setFormData({ ...formData, selectFontSize: selectedFontSize });
						}}
					/>
					<Select
						selected={formData.selectColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selectedColor) => {
							setFormData({ ...formData, selectColor: selectedColor });
						}}
					/>
					<Separator />
					<Select
						selected={formData.selectBackgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selectedBgColor) => {
							setFormData({
								...formData,
								selectBackgroundColor: selectedBgColor,
							});
						}}
					/>
					<Select
						selected={formData.selectContainerWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selectedContentWidth) => {
							setFormData({
								...formData,
								selectContainerWidth: selectedContentWidth,
							});
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
