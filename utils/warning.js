import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export const warning = {
    onAlert,
    success,
    error,
    alert,
    clear
};

export const AlertType = {
    Success: 'Success',
    Error: 'Error',
    Info: 'Info',
    Warning: 'Warning'
};

const alertSubject = new Subject();
const defaultId = 'default-alert';


function onAlert(id = defaultId) {
    return alertSubject.asObservable().pipe(filter(x => x && x.id === id));
}


function success(message, options) {
    alert({ ...options, type: AlertType.Success, message });
}

function error(message, options) {
    alert({ ...options, type: AlertType.Error, message });
}





function alert(alert) {

    alert.id = alert.id || defaultId;
    alert.autoClose = alert.autoClose;
    alertSubject.next(alert);
}

// clear
function clear(id = defaultId) {
    alertSubject.next({ id });
}