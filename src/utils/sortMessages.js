/* eslint-disable max-len */
export const messageDesc = array => array.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()).reverse();
export const messageAsc = array => array.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).reverse();
