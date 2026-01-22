import { Injectable, Inject } from '@nestjs/common';
import type { QdrantClient } from '@qdrant/js-client-rest';

@Injectable()
export class QdrantService {
  constructor(@Inject('QDRANT_CLIENT') private readonly qdrant: QdrantClient) {}

  async getMemories(agentName: string, limit = 20) {
    const result = await this.qdrant.scroll('agent_memories', {
      filter: {
        must: [{ key: 'agent_name', match: { value: agentName } }],
      },
      limit,
      with_payload: true,
    });

    return result.points.map((point) => ({
      id: point.id,
      ...point.payload,
    }));
  }

  async searchMemories(query: string, vector: number[], limit = 10) {
    const result = await this.qdrant.search('agent_memories', {
      vector,
      limit,
      with_payload: true,
    });

    return result.map((point) => ({
      id: point.id,
      score: point.score,
      ...point.payload,
    }));
  }

  async getSkills(agentName: string, limit = 20) {
    const result = await this.qdrant.scroll('agent_skills', {
      filter: {
        must: [{ key: 'agent_name', match: { value: agentName } }],
      },
      limit,
      with_payload: true,
    });

    return result.points.map((point) => ({
      id: point.id,
      ...point.payload,
    }));
  }

  async getCollectionInfo(collectionName: string) {
    return this.qdrant.getCollection(collectionName);
  }

  async getMemoriesCount() {
    const info = await this.qdrant.getCollection('agent_memories');
    return info.points_count;
  }

  async getSkillsCount() {
    const info = await this.qdrant.getCollection('agent_skills');
    return info.points_count;
  }
}
