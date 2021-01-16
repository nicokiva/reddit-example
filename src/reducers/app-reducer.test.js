import reducer from './app-reducer';

describe('app-reducer', () => {
    const other = { property: 'something' };
    test('should return sidebar is opened', () => {
        const newState = reducer({ sideBarIsOpen: false, ...other }, { type: 'OPEN_SIDEBAR' });
        expect(newState).toEqual({ sideBarIsOpen: true, ...other })
    });

    test('should return sidebar is closed', () => {
        const newState = reducer({ sideBarIsOpen: true, ...other }, { type: 'CLOSE_SIDEBAR' });
        expect(newState).toEqual({ sideBarIsOpen: false, ...other })
    });

    test('should return current status (sidebar is open) because type does not exist', () => {
        const newState = reducer({ sideBarIsOpen: true, ...other }, { type: 'NEW_TYPE' });
        expect(newState).toEqual({ sideBarIsOpen: true, ...other })
    });
});