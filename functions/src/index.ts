import { https } from "firebase-functions";
import { db } from "./config";

export const searchDocuments = https.onRequest(async (req, res) => {
    const searchKey = (req.query.search?.toString() || "").toLowerCase();
    try {
        const snapshot = await db.collection('users').get();

        const results: any = snapshot.docs
            .map(doc => doc.data())
            .filter(data =>
            (data?.firstName?.toLowerCase()?.includes(searchKey) ||
                data?.lastName?.toLowerCase()?.includes(searchKey) ||
                data?.bio?.toLowerCase()?.includes(searchKey) ||
                data?.headline?.toLowerCase()?.includes(searchKey))
            )
            .flatMap(data => Object.values(data))
            .filter(value => value?.toLowerCase()?.includes(searchKey));

        res.send({ results });
    } catch (error) {
        throw error;
    }
});
