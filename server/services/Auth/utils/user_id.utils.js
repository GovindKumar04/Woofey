import { Snowflake } from "@skorotkiewicz/snowflake-id";

const machineId = Number(process.env.SNOWFLAKE_MACHINE_ID || 1);

console.log(machineId)
export const snowflake = new Snowflake(machineId);