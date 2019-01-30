```jsx harmony
class ModalSample extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.rootTitle = {
            text: 'Корень Заголовок',
            childs: [{
                text: 'Уровень2 Заголовок1',
                childs: [{
                    text: 'Уровень3 Заголовок1'
                }, {
                    text: 'Уровень3 Заголовок2'
                }]
            }, {
                text: 'Уровень2 Заголовок2',
                childs: [{
                    text: 'Уровень3 Заголовок'
                }]
            }, {
                text: 'Уровень2 Заголовок3',
                childs: [{
                    text: 'Уровень3 Заголовок'
                }]
            }]
        };
    
        this.state = {
            modalVisible: false,
            currentTitle: this.rootTitle
        };
        
        this.onMultiLevelModalBackward = this.onMultiLevelModalBackward.bind(this);
        this.onMultiLevelModalClose = this.onMultiLevelModalClose.bind(this);
        this.onOpenModalButtonClick = this.onOpenModalButtonClick.bind(this);
	}

	render() {
		return (
			<React.Fragment>
				<button onClick={this.onOpenModalButtonClick}>Открыть модальное окно</button>
				{this.state.modalVisible && (
					<MultiLevelModal
						rootTitle={this.rootTitle}
						currentTitle={this.state.currentTitle}
						onBackward={this.onMultiLevelModalBackward}
						onClose={this.onMultiLevelModalClose}
					>
						{this.state.currentTitle.childs && (
							this.state.currentTitle.childs.map((childTitle, index) => (
								<a
									href='#'
									
								>
									
								</a>
							))
						)}
					</MultiLevelModal>
				)}
			</React.Fragment>
		);
	}

	/**
	 * Обработчик события нажатия на кнопку Вернуться на предыдущий заголовок модального окна.
	 */
	onMultiLevelModalBackward(parentTitle, currentTitle) {
		if (parentTitle) {
			this.setState({
				currentTitle: parentTitle
			});
		}
	}

	/**
	 * Обработчик события нажатия на кнопку Открыть модальное окно.
	 */
	onOpenModalButtonClick() {
		this.setState({
			modalVisible: true
		});
	}

	/**
	 * Обработчик события нажатия на кнопку Закрыть модального окна.
	 * Закрывает окно.
	 * Устанавливает корневой заголовок окна.
	 */
	onMultiLevelModalClose() {
		this.setState({
			modalVisible: false,
			currentTitle: this.rootTitle
		});
	}

}

<ModalSample/>
```````````````