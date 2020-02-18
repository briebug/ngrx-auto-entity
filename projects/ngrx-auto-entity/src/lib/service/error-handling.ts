import { throwError } from 'rxjs';
import { IEntityInfo } from '../actions/entity-info';

export const notImplemented = (method: string, entityInfo: IEntityInfo): string =>
  `Entity service method "${method}" has not been implemented. (Entity: ${entityInfo.modelName})`;
export const notAFunction = (method: string, entityInfo: IEntityInfo): string =>
  `Entity service method "${method}" is not a function. (Entity: ${entityInfo.modelName})`;

export const logAndThrow = (method: string, err: any, entityInfo: IEntityInfo) => {
  console.error(`[NGRX-AE] ! Service error: ${method}(). (Entity: ${entityInfo.modelName})`);
  console.error(err);
  return throwError({ info: entityInfo, err });
};

export const logServiceLocateFailure = (entityInfo: IEntityInfo, serviceName: string): void =>
  console.error(`[NGRX-AE] ! Error: Unable to locate entity service for model "${entityInfo.modelName}"`);

export const logErrorDetails = (error: any): void => console.error(`[NGRX-AE] ! Error Details:`, error);
