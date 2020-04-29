import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import {
  TextField,
  Button
} from '@material-ui/core'

import { actionTypes } from '../../../features/series'
import { ILabel } from '../../../models/ILabel'
import { ISeries } from '../../../models/series'

type SeriesLabelFromProps = { 
  series: ISeries, 
  onCreate?: () => void ,
  onCancel?: () => void
}

export const SeriesLabelFrom: React.FC<SeriesLabelFromProps> = (props: SeriesLabelFromProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const localSeries = props.series;

  const onCancel = () => {
    if(props.onCancel !== undefined) props.onCancel();
  }

  const validate = (values: ILabel) => {
    let errors = {};
    if (values.labelKeyId === '') {
      errors = {"labelKeyId": 'Required'};
    }
    if (values.assignedValue === '') {
      errors = {"assignedValue": 'Required'};
    }
    return errors;
  };

  const defaultValues = {
    id: '',
    userId: '',
    labelKeyId: '',
    labelTypeId: '',
    labelValueId: '',
    isPublic: '',
    isApproved: '',
    assignedValue: '',
  }

  return (
      <Formik
        enableReinitialize
        initialValues = {defaultValues}
        validate = {validate}
        onSubmit={(values: ILabel) => {
          if(props.series == null)
          {
            throw Error("No series selected")
          }
          if(props.series.labels == null)
          {
            props.series.labels = new Array<ILabel>();
          }
          props.series.labels.push(values);
          dispatch({ type: actionTypes.UPDATE_SERIES, series: localSeries});
          if(props.onCreate !== undefined) props.onCreate();
        }}
      >
      {({
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="labelKeyId"
            label="Label Key"
            onChange={handleChange}
            value={values.labelKeyId}
            fullWidth
          />
          <TextField
            margin="dense"
            id="assignedValue"
            label="Value"
            onChange={handleChange}
            value={values.assignedValue}
            fullWidth
          />
          <Button color="primary" onClick={onCancel}>
            {t("Cancel")}
          </Button>
          <Button type="submit" disabled={isSubmitting} color="primary">
            {t("Create")}
          </Button>
        </form>
      )}
    </Formik>
  )
}
