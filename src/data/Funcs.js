//Funcs.js
import Messages from './Messages'

export function errorCase(errorType) {
  switch (errorType) {
    case "ratelimit":
      return Messages.ratelimit;
    case "email":
      return Messages.email;
    case "stringMin":
      return Messages.stringMin;
    case "recaptcha":
      return Messages.recaptcha;
    case "exist":
      return Messages.exist;
    case "disposable":
      return Messages.disposable;
    case "somethingWrong":
      return Messages.somethingWrong;   
  }
}

export function successCase(statusType) {
  switch(statusType) {
    case 'queued':
      return Messages.queued;
    case 'emailed':
      return Messages.emailed;
  }
}