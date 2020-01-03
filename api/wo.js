import Request from '../common/request/js/index';

export default {
	initWO() {
	    return Request().post('/wo/initWO', {
	        header: {
	            contentType: 'application/json'
	        },
	    });
	}
}