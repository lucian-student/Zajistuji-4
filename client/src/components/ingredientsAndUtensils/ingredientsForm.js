import React, { Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form';
import { FiPlusCircle } from 'react-icons/fi';
function IngredientsForm() {
    const { handleSubmit, register, errors } = useForm();
    return (
        <Fragment>
            <Button variant="light" style={{ width: '100%' }}>
                <FiPlusCircle style={{ display: 'inline' }} />
                <p style={{ display: 'inline' }}>Add Ingredients</p>
            </Button>
        </Fragment>
    )
}

export default IngredientsForm;