
export const ACCESS_TOKEN = 'accessToken';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};


export function login(loginRequest) {
    return request({
        url: "http://localhost:8080/login",
        method: 'POST',
        body: JSON.stringify({
            userName: loginRequest.username,
            password: loginRequest.password

        })
    });
}

export const createUser = (user) => {
    return fetch('http://localhost:8080/sign_up', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: user.email,
            password: user.pwd,
            userName: user.username,
            fullName: user.fullname
        })

    });
};

export const doesUserExist = (user) => {
    return fetch('http://localhost:8080/user/exists?userName='+user.username+'&email='+user.email,  {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain'
        }
    });
};


export const getCurrentUser = () => {
    return request({
        url: "http://localhost:8080/current_user",
        method: 'GET'
    });
};

export const updateUserInfo = (user) => {

    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    return fetch("http://localhost:8080/user", {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({
            id: user.id,
            email: user.email,
            password: user.pwd,
            userName: user.username,
            fullName: user.fullname
        })
    });
};

export const getUserFavourites = (id) => {
    return request({
        url: "http://localhost:8080/favourite/"+id,
        method: 'GET'
        });
};

export const getComics = () => {
    return request({
        url: "http://localhost:8080/comic/",
        method: 'GET'
    });
};

export const getComicsByCategory = (category) => {
    return request({
        url: "http://localhost:8080/"+category,
        method: 'GET'
    });
};

export const getComicsByID = (id) => {
    return request({
        url: "http://localhost:8080/comic/"+id,
        method: 'GET'
    });
};

export const addFavorite = (user, comic) => {
    return fetch('http://localhost:8080/favourite', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: user,
            comic_id: comic
        })

    });
};

export const removeFavoriteFromUser = (user, comic) => {

    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    return fetch("http://localhost:8080/favourite/delete", {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify({
            userId: user,
            comicId: comic
        })
    });
};


export const getUserStillReading = (id) => {
    return request({
        url: "http://localhost:8080/still_reading/"+id,
        method: 'GET'
    });
};

export const addStillReading = (user, comic) => {
    return fetch('http://localhost:8080/still_reading', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: user,
            comic_id: comic
        })

    });
};

export const removeStillReadingFromUser = (user, comic) => {

    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    return fetch("http://localhost:8080/still_reading/delete", {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify({
            userId: user,
            comicId: comic
        })
    });
};

export const getUserSaved = (id) => {
    return request({
        url: "http://localhost:8080/saved/"+id,
        method: 'GET'
    });
};

export const addSaved = (user, comic) => {
    return fetch('http://localhost:8080/saved', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: user,
            comic_id: comic
        })

    });
};

export const removeSavedFromUser = (user, comic) => {

    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    return fetch("http://localhost:8080/saved/delete", {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify({
            userId: user,
            comicId: comic
        })
    });
};

export const userIsReading = (user, comic) => {
    return request({
        url: "http://localhost:8080/user/still_reading?userId="+user+"&comicId="+comic,
        method: 'GET'
    });
};

export const userHasSaved = (user, comic) => {
    return request({
        url: "http://localhost:8080/user/saved?userId="+user+"&comicId="+comic,
        method: 'GET'
    });
};

export const userHasFavorite = (user, comic) => {
    return request({
        url: "http://localhost:8080/user/favorite?userId="+user+"&comicId="+comic,
        method: 'GET'
    });
};