import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

import {Form, Button, InputGroup, Image, Row, Col, Spinner } from 'react-bootstrap';

const AiImageGenerator = () => {

    const [searchImage, setSearchImage] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    // console.log(process.env.REACT_APP_OPENAI_API_KEY);

    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);



    const generateImage = async () => {

        setLoading(true);

        if (result.length > 0) {
            setResult('');
        }

        const response = await openai.createImage({
            prompt: searchImage,
            n: 1,
            size: "1024x1024"
        });
        if (response.data.data[0].url) {
            setLoading(false);
        }
        setResult(response.data.data[0].url);
    }

    const reset = () => {
        setResult('');
        setSearchImage('');
    }

    return (

        <Row className='justify-content-md-center p-2 m-auto'>
            <Col xs={12} sm={12} lg={12} md={12} xl={12} xxl={12} >

                <h2 className='fw-bold text-light text-center p-3 fs-1'><span className='text-warning'>Search any image</span> using <span className='text-dark'>Ai based system</span></h2>

                <Col xs={6} sm={6} lg={6} md={6} xl={6} xxl={6} className="m-auto">

                    <InputGroup className="mb-3">
                        <Form.Control
                            type='text' name='searchImage'
                            onChange={(e) => setSearchImage(e.target.value)}
                            value={searchImage}
                            placeholder="Search image"
                        />
                        <Button variant={result.length > 0 ? 'success' : 'primary'} id="search" type="submit" onClick={generateImage}>
                            Search
                        </Button>
                        {result.length>0 && <Button variant='danger' id="search" type="submit" onClick={reset}>Reset</Button>}
                        
                    </InputGroup>
                </Col>
            </Col>
            <Col xs={12} sm={12} lg={12} md={12} xl={12} xxl={12} className="p-2 text-center">
                <Col xs={8} sm={8} lg={8} md={8} xl={8} xxl={8} className="m-auto">

                    {
                        loading === true ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : ''
                    }


                    {result.length > 0 && <Image src={result} className='img-fluid shadow-lg' width='50%' height='auto' />}

                </Col>
            </Col>
        </Row>

    )
}

export default AiImageGenerator