import { assign, createMachine } from 'xstate';

export const authMachine = createMachine(
	{
		id: 'authMachine',
		initial: 'login',
		predictableActionArguments: true,
		context: {
			error: '',
		},
		states: {
			login: {
				on: {
					SIGN_UP: 'signUp',
					RESET_PASSWORD: 'resetPassword',
					ONE_TIME_PASSWORD: 'oneTimePassword',
				},
			},
			signUp: {
				on: { SIGN_IN: 'login' },
			},
			resetPassword: {
				on: {
					SIGN_IN: 'login',
					RESET_PASSWORD_CONFIRM: 'resetPasswordConfirm',
				},
			},
			resetPasswordConfirm: {
				entry: 'setErrorMessage',
				exit: 'clearError',
				on: { SIGN_IN: 'login', RESET_PASSWORD: 'resetPassword' },
			},
			oneTimePassword: {
				on: { SIGN_IN: 'login' },
			},
		},
	},
	{
		actions: {
			setErrorMessage: assign(() => ({
				error: 'Some generic test message',
			})),
			clearError: assign(() => ({
				error: '',
			})),
		},
	}
);
