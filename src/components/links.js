import React, { useEffect, useState } from 'react'
import Linkform from './Linkform';
import { db } from '../firebase';
import { toast } from 'react-toastify'



const Links = () => {

    const [links, setLinks] = useState([]);

    const [currentId, setCurrentId] = useState('');

    const addOrEdditLink = async (linkObject) => {
        try {
            if (currentId === '') {
                await db.collection('link').doc().set(linkObject);
                toast('New Link Added', {
                    type: 'success',
                    autoClose: 2000,
                });
            } else {
                await db.collection('link').doc(currentId).update(linkObject);
                toast('Link Updated Successfully', {
                    type: 'info',
                    autoClose: 2000,
                });
                setCurrentId('');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onDeleteLink = async id => {

        if (window.confirm('Are you sure you want to delete this link?')) {
            await db.collection('link').doc(id).delete()
            toast('Link deleted Succesfully', {
                type: 'error',
                autoClose: 2000,
            })
        }

    }

    const getLinks = async () => {
        db.collection('link').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setLinks(docs);
        });

    };

    useEffect(() => {
        getLinks();

    }, []);

    return (
        <>
            <div className="col-md-4 p-2">
                <Linkform {...{ addOrEdditLink, currentId, links }} />

            </div>
            <div className="col-md-8 p-2">
                {links.map(link => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4> {link.name} </h4>
                                <div>
                                    <i className="material-icons text-danger"
                                        onClick={() => onDeleteLink(link.id)}>
                                        close
                                </i>

                                    <i className="material-icons"
                                        onClick={() => setCurrentId(link.id)}>
                                        create
                                </i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href="{link.url}" target="_blank">
                                Go to Website
                            </a>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}


export default Links;