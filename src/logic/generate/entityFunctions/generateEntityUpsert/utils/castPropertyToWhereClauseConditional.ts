import { Property } from '../../../../../types';
import { castPropertyToColumnName } from '../../../utils/castPropertyToColumnName';
import { castPropertyToTableColumnValueReference } from './castPropertyToTableColumnValueReference';

export const castPropertyToWhereClauseConditional = ({ name, definition }: { name: string; definition: Property }) => {
  const columnName = castPropertyToColumnName({ name, definition }); // no change
  const columnValueReference = castPropertyToTableColumnValueReference({ name, definition });
  return [
    `AND (${columnName} = ${columnValueReference}`,
    definition.nullable ? ` OR (${columnName} IS null AND ${columnValueReference} IS null)` : '', // NULL != NULL, so special check if field is nullable
    ')',
  ].join('');
};
