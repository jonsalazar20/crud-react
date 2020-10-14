import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import { toast } from 'react-toastify';

const Linkform = (props) => {

    /**
     * @function initialStateValues to set the initial state of our component
     * this is an object that contains three properties url, name, description
     */
    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    };

    /**
     * @constant [values, setValues] this is an array use in hook useState that allows us to set an initial state
     * as a parameters we receive the initialStateValues 
     */

    const [values, setValues] = useState(initialStateValues);


    /**
     * 
     * @param {*} e 
     */
    const handleInputChanges = e => {

        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const validUrl = string => {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(string);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(!validUrl(values.url)){
            return toast('Invalid URL', {
                type: 'warning',
                autoClose: 2000,
            })
        }
        props.addOrEdditLink(values);
        setValues({ ...initialStateValues })

    }

    const getLinkById = async id => {
        const doc = await db.collection('link').doc(id).get();
        setValues({ ...doc.data() })
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({ ...initialStateValues });
        } else {
            getLinkById(props.currentId);
        }
    }, [props.currentId])

    return (
        <form className="card card-body" onSubmit={handleSubmit} >
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input
                    onChange={handleInputChanges}
                    type="text"
                    className="form-control"
                    placeholder="https://someurl.com"
                    name="url"
                    value={values.url}
                />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input
                    onChange={handleInputChanges}
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="WebsiteName"
                    value={values.name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleInputChanges}
                    name="description"
                    rows="3"
                    className="form-control"
                    placeholder="Write a description"
                    value={values.description}
                >
                </textarea>
            </div>
            <button className="btn btn-primary btn-block" >
                {props.currentId === '' ? 'Save' : 'Update'}
            </button>
        </form>
    );
};


export default Linkform;