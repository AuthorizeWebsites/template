// import { ReactComponentLike, string } from "prop-types";

// export type ReadOnly<T> = {
//   readonly [P in keyof T]: T[P] extends any[]
//     ? Readonly<T[P]>
//     : T[P] extends object
//     ? Readonly<T[P]>
//     : T[P];
// };

// type RuleT = {
//   required: () => RuleT;
//   custom: (
//     cb: (
//       field: any,
//       meta: {
//         parent: { [key: string]: any };
//         path: string[];
//         document: { [key: string]: any };
//       }
//     ) => true | string | Promise<true | string>
//   ) => RuleT;
//   min: (min: number) => RuleT;
//   max: (max: number) => RuleT;
//   length: (exactLength: number) => RuleT;
//   greaterThan: (gt: number) => RuleT;
//   uri: (options: { scheme: string[] }) => RuleT;
// };

// interface DataTypeBaseI {
//   type: string; // todo : restrict to defined string literals
//   name: string;
//   title?: string;
//   hidden?: boolean;
//   readOnly?: boolean;
//   description?: string;
//   validation?: (rule: RuleT) => RuleT;
// }

// type ObjectDataTypesExcludingArrayDataTypeU = BlockDataTypeI;

// type ObjectDataTypesU = ObjectDataTypesExcludingArrayDataTypeU | ArrayDataTypeI;

// type PrimitiveDataTypesU = BooleanDataTypeI | DateDataTypeI | DatetimeDateTypeI;

// type DataTypesU = ObjectDataTypesU | PrimitiveDataTypesU;

// type ArrayOfU =
//   | ObjectDataTypesExcludingArrayDataTypeU[]
//   | PrimitiveDataTypesU[];

// interface TitleValuePairI {
//   title: string;
//   value: string;
// }

// export interface ArrayDataTypeI extends DataTypeBaseI {
//   type: "array";
//   of?: ArrayOfU;
//   options?: {
//     sortable?: boolean;
//     layout?: "tags" | "grid";
//     list?: TitleValuePairI[];
//     editModal?: "dialog" | "fullscreen" | "popover";
//   };
// }

// export interface BlockDataTypeI extends DataTypeBaseI {
//   type: "block";
//   styles?: TitleValuePairI[];
//   lists?: TitleValuePairI[];
//   marks?: {
//     decorators: TitleValuePairI[];
//     annotations: DataTypesU[];
//   };
//   of?: DataTypesU[];
//   icon?: ReactComponentLike;
// }

// export interface BooleanDataTypeI extends DataTypeBaseI {
//   type: "boolean";
//   layout?: "switch" | "checkbox";
// }

// type MomentFormatT = string;

// export interface DateDataTypeI extends DataTypeBaseI {
//   type: "date";
//   dateFormat?: MomentFormatT;
//   calendarTodayLabel?: string;
// }

// export interface DatetimeDateTypeI extends DataTypeBaseI {
//   type: "datetime";
//   dateFormat?: MomentFormatT;
//   timeFormat?: MomentFormatT;
//   timeStep?: number;
//   calendarTodayLabel?: string;
// }

// type NonemptyArray<T> = {
//   0: T;
//   1: T;
// } & Array<T>;

// export interface DocumentDataTypeI {
//   type: "document";
//   fields: NonemptyArray<DataTypesU>;
//   liveEdit?: boolean;
//   fieldsets?: { name: string; title: string }[];
// }

// export interface
