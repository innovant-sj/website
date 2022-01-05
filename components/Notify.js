import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { warning, AlertType } from  '../utils/warning';

Notify.propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

Notify.defaultProps = {
    id: 'default-alert',
    fade: true
};

function Notify({ id, fade }) {
    const router = useRouter();
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {       
        const subscription = warning.onAlert(id)
            .subscribe(alert => {               
                if (!alert.message) {
                    setAlerts(alerts => {               
                        const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange);
                        filteredAlerts.forEach(x => delete x.keepAfterRouteChange);
                        return filteredAlerts;
                    });
                } else {
                    setAlerts(alerts => ([ alert]));
                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert), 3000);
                    }
                }
            });

        const clearAlerts = () => {
            setTimeout(() => warning.clear(id));
        };
        router.events.on('routeChangeStart', clearAlerts);
        return () => {
            subscription.unsubscribe();
            router.events.off('routeChangeStart', clearAlerts);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function removeAlert(alert) {
        if (fade) {
            // fade out 
            const alertWithFade = { ...alert, fade: true };
            setAlerts(alerts => alerts.map(x => x === alert ? alertWithFade : x));

            // remove  after faded out
            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x !== alertWithFade));
            }, 250);
        } else {
            // remove 
            setAlerts(alerts => alerts.filter(x => x !== alert));
        }
    };

    function cssClasses(alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];

        const alertTypeClass = {
            [AlertType.Success]: 'alert-success',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Info]: 'alert-info',
            [AlertType.Warning]: 'alert-warning'
        }

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }

    if (!alerts.length) return null;

    return (
        <div className="alert_holder">
            
                {alerts.map((alert, index) =>
                    <div key={index} className={cssClasses(alert)}>
                        <a className="close" onClick={() => removeAlert(alert)}>&times;</a>
                        <span dangerouslySetInnerHTML={{ __html: alert.message }}></span>
                    </div>
                )}
            
        </div>
    );
}

export default Notify;