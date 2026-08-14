import { kafka } from "./kafka.js";

class KafkaAdmin {

    async connectAdmin(params) {
        const admin = await kafka.admin();
        await admin.connect();
        console.log("Admin connected");
        return admin;
    }

    async deleteTopics(topics) {
        const admin = await this.connectAdmin();
        try {
            const topicsList = await admin.listTopics();
            const validTopics = topics.filter(topic => topicsList.includes(topic));

            if (validTopics.length > 0) {
                await admin.deleteTopics({
                    topics: validTopics,
                    timeout: 5000
                });
                console.log(`Topics delete success: ${validTopics.join(', ')}`);
            } else {
                console.log('No matching topics found to delete.');
            }
        } catch (error) {
            console.log('Topic Delete Error:', error.message);
        } finally {
            await admin.disconnect();
        }
    }

    async createTopics(topic) {
        const admin = await this.connectAdmin();
        try {
            const topicsList = await admin.listTopics();

            if (!topicsList.includes(topic)) {
                await admin.createTopics({
                    topics: [{
                        topic,
                        numPartitions: 5,
                        replicationFactor: 1
                    }]
                });
                console.log(`Topic '${topic}' created successfully with 5 partitions`);
            } else {
                console.log(`Topic '${topic}' already exists.`);
            }
        } catch (error) {
            console.log('Topic Create Error:', error.message);
        } finally {
            await admin.disconnect();
        }
    }
}

export default new KafkaAdmin();
