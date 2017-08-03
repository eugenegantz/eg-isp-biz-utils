'use strict';

module.exports = {

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