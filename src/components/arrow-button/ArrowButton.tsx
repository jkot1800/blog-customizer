import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

// Тип пропсов для ArrowButton
export type ArrowButtonProps = {
	onClick: OnClick;
	isOpen?: Boolean;
};

export const ArrowButton = (proops: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={proops.onClick}
			role='button'
			aria-label={
				proops.isOpen
					? 'Закрыть форму параметров статьи'
					: 'Открыть форму парамтеров статьи'
			}
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: proops.isOpen,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: proops.isOpen,
				})}
			/>
		</div>
	);
};
