// @flow
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PopupForm from '../components/PopupForm/PopupForm';
import { useBoolState } from '../utils/hooks';

const Wrapper = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const fields = ['Fedor', 'Rychkov', '+39 999 999 99 99', 'fr@labado.ru'];
const types = {name: 0, surname: 1, phone: 2, email: 3};

const styles = theme => ({
  button: {
    margin: theme.spacing(2),
    maxWidth: 200,
    width: '100%'
  },
});

const Home = withStyles(styles)((props: Object) => {
  const { classes } = props;
  const [isOpen, { toggleState }] = useBoolState();
  const [values, setValues] = useState({})

  useEffect((e) => {
    setValues({});
  }, [])

  const onSave = () => {
    console.log('current value is ', values);
  }

  return (
    <Wrapper>
      <Button variant="contained" color="primary" className={classes.button} onClick={toggleState}>Open</Button>
      <Button variant="contained" color="primary" className={classes.button} onClick={() => setValues(types)}>Set default</Button>
      <Button variant="contained" color="primary" className={classes.button} onClick={() => setValues({})}>Clear</Button>
      <p>Current value is {JSON.stringify(values)}</p>
      <PopupForm
        isOpen={isOpen}
        onClose={toggleState}
        popupTitle="Import Customers Base"
        fields={fields}
        values={values}
        setValues={setValues}
        onSave={onSave}
      />
    </Wrapper>
  );
});

export default Home;

