import Request from '../common/request/js/index';

export default {
    login(data) {
        return Request().post('/user/login', {
            header: {
                contentType: 'application/json'
            },
            data: data
        });
    },
	
	getUserInfo() {
	    return Request().post('/user/getUserInfo', {
	        header: {
	            contentType: 'application/json'
	        },
	    });
	},
};
