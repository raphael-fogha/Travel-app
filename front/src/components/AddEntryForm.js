import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {createLogEntry} from "../API";


const AddEntryForm = ({location, onClose}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const{register, handleSubmit} = useForm();
    
    const onSubmit = async (data) => {
        try{
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntry(data);
            console.log(created);
            onClose();
        } catch (error) {
           console.error(error); 
           setError(error.message);
           setLoading(false);

        }
    };

    return(
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
        {error ? <h3 className="error">{error}</h3> : null}
        <label htmlFor="title">Titre</label>
        <input 
            name="title"
            type="text" required 
            ref={register}/>
        <label htmlFor="comment" required >Commentaire</label>
        <textarea name="comment" rows="3" ref={register}></textarea>
        <label htmlFor="image">Image</label>
        <input 
            name="image"
            type="text" ref={register}/>
        <label htmlFor="visitDate">Date de visite</label>
        <input 
            name="visitDate"
            type="date"
            ref={register}
            required/>
            <button disabled={loading}>{loading ? 'Loading...' : 'Enregistrer'}</button>
    </form>
    )
};

export default AddEntryForm;
