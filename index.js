'use strict';

module.exports = {

	biz: {

		tax: {

			taxId: {

				/**
				 * @param {Array | String} id
				 * @return {Array}
				 */
				_toArrNum(id = []) {
					if (typeof id === 'string')
						id = id.trim().split('');

					id.forEach((v, i) => id[i] = +id[i]);

					return id;
				},


				/**
				 * @param {Array} id
				 * @return {Boolean}
				 */
				_isValidNumSet(id = []) {
					return id.every(v => isFinite(v));
				},


				/**
				 * Является ли ИНН валидным
				 * либо для физ. лица
				 * либо для юр. лица
				 * @param {String | Array} id - ИНН
				 * @return {Boolean}
				 */
				isValid(id = []) {
					if (10 === id.length)
						return this.isValidForJuridicalPerson(id);

					if (12 === id.length)
						return this.isValidForNaturalPerson(id);

					return false;
				},


				/**
				 * Является ли ИНН валидным
				 * либо для физ. лица
				 * @param {String | Array} id - ИНН
				 * @return {Boolean}
				 */
				isValidForNaturalPerson(id = []) {
					id = this._toArrNum(id);

					if (id.length != 12)
						return false;

					if (!this._isValidNumSet(id))
						return false;

					let s1 = (
						(
							  (7 * id[0])
							+ (2 * id[1])
							+ (4 * id[2])
							+ (10 * id[3])
							+ (3 * id[4])
							+ (5 * id[5])
							+ (9 * id[6])
							+ (4 * id[7])
							+ (6 * id[8])
							+ (8 * id[9])
						) % 11
					) % 10;

					let s2 = (
						(
							  (3 * id[0])
							+ (7 * id[1])
							+ (2 * id[2])
							+ (4 * id[3])
							+ (10 * id[4])
							+ (3 * id[5])
							+ (5 * id[6])
							+ (9 * id[7])
							+ (4 * id[8])
							+ (6 * id[9])
							+ (8 * id[10])
						) % 11
					) % 10;

					return s1 === id[10] && s2 === id[11];
				},


				/**
				 * Является ли ИНН валидным
				 * либо для юр. лица
				 * @param {String | Array} id - ИНН
				 * @return {Boolean}
				 */
				isValidForJuridicalPerson(id) {
					id = this._toArrNum(id);

					if (!this._isValidNumSet(id))
						return false;

					let s1 = (
						(
							  (2 * id[0])
							+ (4 * id[1])
							+ (10 * id[2])
							+ (3 * id[3])
							+ (5 * id[4])
							+ (9 * id[5])
							+ (4 * id[6])
							+ (6 * id[7])
							+ (8 * id[8])
						) % 11
					) % 10;

					return id[9] === s1;
				}

			}

		}

	},


	datetime: {

		/**
		 * Является ли строка временной отметкой (timestamp)?
		 * @param {String} str
		 * @return {Boolean}
		 * */
		isTimestamp(str) {
			return !!str.match(/^\d+$/ig);
		},


		/**
		 * Можно ли строку использовать в качестве даты и времени?
		 * @param {String} str
		 * @return {Boolean}
		 * */
		isAvailDateTime(str) {
			if (str instanceof Date)
				return true;

			if (this.isTimestamp(str))
				return true;

			return !!str.match(/\d{4}-\d{2}-\d{2}[\s]\d{2}:\d{2}$/ig);
		}

	},


	tel: {

		mob: {

			/**
			 * Вернет номер моб. телефона за вычетом символов разметки (кроме ведущего +)
			 * @param {String} str
			 * @return {String}
			 * */
			normalize(str) {
				return str.replace(/[(\[\-\])\s]/ig, '');
			},


			/**
			 * Является ли переданная строка моб. тел. номером
			 * @param {String} str
			 * @return {Boolean}
			 * */
			isValid(str) {
				return !!(this.normalize(str) || '').replace(/[(\[\-\])\s]/ig, '').match(/^\+[\d]{11}$/ig);
			},

		}

	},


	email: {

		/**
		 * @param {String} str
		 * @return {Boolean}
		 * */
		isValid(str) {
			let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			
			return re.test(str);
		}

	},

};