import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export function callFetch(urlSegment, fetchMethod, data, setError) {
  if (!urlSegment || !fetchMethod)
    return {};

  let bodyData = makeFormData(fetchMethod, data);
  let isOk = null;
  return fetch(process.env.NEXT_PUBLIC_API_URL + urlSegment, bodyData)
    .then(res => {
      isOk = res.ok;
      return res.json();
    })
    .then(resData => {
      if (!isOk && resData.errors) {
        showServerErrors(setError, resData.errors);
        toast.error("Error!");
      }
      else {
        if (fetchMethod !== 'GET' && urlSegment !== 'auth/login' && urlSegment.split('?')[1] !== 'toast=false')
          toast.success("Success!");
      }

      resData.ok = isOk;
      return resData;
    });
}

function makeFormData(fetchMethod, data) {
  let formData = new FormData();
  for (let [key, value] of Object.entries(data)) {
    if (value instanceof FileList) {
      if (typeof value[0] !== 'undefined')
        formData.append(key, value[0]);
    }
    else
      formData.append(key, value);
  }

  let bodyData = {
    method: fetchMethod,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  };
  if (fetchMethod !== 'GET')
    bodyData.body = JSON.stringify(data);//formData;

  return bodyData;
}

function showServerErrors(setError, errorData) {
  if (!setError)
    return;

  for (let e of errorData) {
    setError(e.path, {
      type: "server",
      message: e.msg
    });
    if (document.querySelector("*[name='" + e.path + "']"))
      document.querySelector("*[name='" + e.path + "']").classList.add('is-invalid');
    // document.querySelector("*[name='" + e.path + "']").setCustomValidity('invalid');
  }
}

export default callFetch;
