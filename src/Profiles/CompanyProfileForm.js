import React from 'react';
import './CompanyProfileForm.scss';
import { inject, observer } from "mobx-react";

@inject("Store")
@observer
class CompanyProfileForm extends React.Component {
    constructor() {
        super();

        console.log('This happens 1st.');

        this.state = {
            loading: 'initial',
            data: ''
        };

        this.firstName = '';

        this.organizationInfo = {
            organizationId: '',
            fullName: '',
            inn: '',
            ogrn: '',
            actualAddress: '',
            actualZipCode: '',
            legalAddress: '',
            legalZipCode: '',
            phone: '',
            site: '',
			email: ''

        };
    }

    makeRequest(method, url) {
        var promise = new Promise((resolve, reject) => {
///            setTimeout(() => {
            const {Store} = this.props;
            console.log('Store.SecurityToken - ' + Store.SecurityToken);

            var xhr = new XMLHttpRequest();

            xhr.open(method, url);
            xhr.setRequestHeader("Content-Type", "application/json");

            let requestData = {
                token: Store.SecurityToken
            }

            xhr.send(JSON.stringify(requestData));

            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(xhr);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
///            }, 10000);
        });

        console.log('This happens 4th.');

        return promise;
    }

    componentDidMount() {

        console.log('This happens 3rd.');

        this.setState({ loading: 'true' });

        this.makeRequest('POST', 'http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService/getCurrentUserOrganizationInfo')
            .then(response => {
                var respJSON = JSON.parse(response.responseText);
                console.log('respJSON - ' + respJSON.operationResult);

                var errorCode = respJSON.operationResult.ErrorCode;
                console.log('Response - ' + response.responseText);
                if (errorCode === "0") {
                    console.log('errorCode - ' + errorCode);
                    var organizationInfo = respJSON.organizationInfo;
                    console.log('organizationInfo Id  - ' + organizationInfo[0].organizationId);

                    this.organizationInfo.organizationId = organizationInfo[0].organizationId;
                    this.organizationInfo.fullName = organizationInfo[0].fullName;
                    this.organizationInfo.inn = organizationInfo[0].inn;
                    this.organizationInfo.ogrn = organizationInfo[0].ogrn;
                    this.organizationInfo.actualAddress = organizationInfo[0].actualAddress;
                    this.organizationInfo.actualZipCode = organizationInfo[0].actualZipCode;
                    this.organizationInfo.legalAddress = organizationInfo[0].legalAddress;
                    this.organizationInfo.legalZipCode = organizationInfo[0].legalZipCode;
                    this.organizationInfo.phone = organizationInfo[0].phone;
                    this.organizationInfo.site = organizationInfo[0].site;
                    this.organizationInfo.email = organizationInfo[0].email;
//                    this.organizationInfo.subOrgName = organizationInfo.subOrg;
//                    this.organizationInfo.subOrgName = organizationInfo.subOrg;

                    console.log('firstName - ' + this.firstName);
//                    this.props.history.push("/home");
//                    Store.UserNameVisible = true;
                } else {
                    var errorDescription = respJSON.operationResult.ErrorDescription;
                    if (errorCode == "410") {
                        this.setState({Message: 'Не указан логин. Пожалуйста, введите логин'})
                    } else if (errorCode == "411") {
                        this.setState({Message: 'Не указан пароль. Пожалуйста, введите пароль.'})
                    } else if (errorCode == "412" || errorCode == "413") {
                        this.setState({Message: 'Пользователь с заданным логином или паролем не найден. Пожалуйста, проверьте правильность написания логина или пароля.'})
                    }
                }
                this.setState({ loading: 'false' });
            })
            .catch(function (err) {
                console.error('Augh, there was an error!', err.statusText);
            });
    }

	render() {
        if (this.state.loading === 'initial') {
            console.log('This happens 2nd - after the class is constructed. You will not see this element because React is still computing changes to the DOM.');
            return <h2>Intializing...</h2>;
        }


        if (this.state.loading === 'true') {
            console.log('This happens 5th - when waiting for data.');
            return <h2>Loading...</h2>;
        }

        console.log('This happens 8th - after I get data.');

		return (
			<div className='companyProfileForm' onScroll={() => console.log('scroll')}>
				<section>
					<h2>Профиль компании</h2>
					<h3>Общие данные</h3>
					<p>
						<input disabled id="some11" type="text" value={this.organizationInfo.fullName}/>
						<label htmlFor="some11" className='textLabel'> Полное наименование компании </label>
					</p>
					<p>
						<input disabled id="some22" type="text" value={this.organizationInfo.inn}/>
						<label htmlFor="some22" className='textLabel'> ИНН </label>
					</p>
					<p>
						<input disabled id="some22" type="text" value={this.organizationInfo.ogrn}/>
						<label htmlFor="some22" className='textLabel'> ОГРН </label>
					</p>


				</section>
				<section>

					<h3>Контактные данные</h3>
					<p>
						<input disabled id="some77" type="text" value={this.organizationInfo.legalAddress}/>
						<label htmlFor="some77" className='textLabel'> Адрес юридический </label>
					</p>
					<p>
						<input disabled id="some88" type="text" value={this.organizationInfo.legalZipCode}/>
						<label htmlFor="some88" className='textLabel'> Индекс </label>
					</p>

					<p>
						<input disabled id="some33" type="text" value={this.organizationInfo.actualAddress}/>
						<label htmlFor="some33" className='textLabel'> Адрес фактический </label>
					</p>
					<p>
						<input disabled id="some44" type="text" value={this.organizationInfo.actualZipCode}/>
						<label htmlFor="some44" className='textLabel'> Индекс </label>
					</p>

					<p>
						<input disabled id="some55" type="text" value={this.organizationInfo.phone}/>
						<label htmlFor="some55" className='textLabel'> Телефон компании </label>
					</p>
					<p>
						<input disabled id="some66" type="text" value={this.organizationInfo.site}/>
						<label htmlFor="some66" className='textLabel'> Сайт </label>
					</p>

					<p>
						<input disabled id="some66" type="text" value={this.organizationInfo.email}/>
						<label htmlFor="some66" className='textLabel'> E-mail </label>
					</p>


				</section>

				<section>

					<h3>Банковские счета</h3>
					<p>
						<input disabled id="some99" type="text" value=" "/>
						<label htmlFor="some99" className='textLabel'> Банк </label>
					</p>
					<p>
						<input disabled id="some111" type="text" value=" "/>
						<label htmlFor="some111" className='textLabel'> Комментарий </label>
					</p>
					<p>
						<input disabled id="some222" type="text" value=" "/>
						<label htmlFor="some222" className='textLabel'> БИК </label>
					</p>
					<p>
						<input disabled id="some333" type="text" value=" "/>
						<label htmlFor="some333" className='textLabel'> SWIFT </label>
					</p>
					<p>
						<input disabled id="some99" type="text" value=" "/>
						<label htmlFor="some99" className='textLabel'> ИНН банка </label>
					</p>
					<p>
						<input disabled id="some111" type="text" value=" "/>
						<label htmlFor="some111" className='textLabel'> КПП банка </label>
					</p>
					<p>
						<input disabled id="some222" type="text" value=" "/>
						<label htmlFor="some222" className='textLabel'> Корреспондентский счет </label>
					</p>
					<p>
						<input disabled id="some333" type="text" value=" "/>
						<label htmlFor="some333" className='textLabel'> Расчетный счет </label>
					</p>
					<p>
						<input disabled id="some99" type="text" value=" "/>
						<label htmlFor="some99" className='textLabel'> Полное наименование получателя </label>
					</p>
					<p>
						<input disabled id="some111" type="text" value=" "/>
						<label htmlFor="some111" className='textLabel'> ИНН получателя </label>
					</p>
					<p>
						<input disabled id="some222" type="text" value=" "/>
						<label htmlFor="some222" className='textLabel'> ОГРН получателя </label>
					</p>

				</section>
			</div>
		);
	}
}
export default CompanyProfileForm