import { post } from "@/shared/fetch";
import { Application, ApplicationType } from "@/shared/structure";

export interface CreateApplicaitonDto {
    accessToken: string;
    description: string;
    type: ApplicationType;
}

export const saveApplicationToDb = (application: CreateApplicaitonDto) =>
    post<CreateApplicaitonDto, Application>(
        `http://localhost:3002/api/v1/applications`,
        application
    );