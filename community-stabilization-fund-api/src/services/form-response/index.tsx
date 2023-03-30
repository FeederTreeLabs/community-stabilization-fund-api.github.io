import getConfig from 'next/config';

import { axiosInstance } from '../constants';

import type { FormResponse } from '../../db';

const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/form-responses`;

const FormResponseService = {
  getAllFormResponses,
  createFormResponse,
  deleteAllFormResponses,
};

async function getAllFormResponses() {
  const res = await axiosInstance.get<FormResponse[]>(`${baseUrl}`);
  return res;
}

async function createFormResponse() {
  const res = await axiosInstance.post<FormResponse>(`${baseUrl}`);
  return res;
}

async function deleteAllFormResponses() {
  const res = await axiosInstance.delete<FormResponse>(`${baseUrl}`);
  return res;
}

export default FormResponseService;
