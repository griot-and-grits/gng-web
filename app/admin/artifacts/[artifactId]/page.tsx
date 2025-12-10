import { ArtifactDetail } from '@/components/admin/artifacts/artifact-detail';

type ArtifactDetailPageProps = {
    params: { artifactId: string };
};

export default function ArtifactDetailPage({ params }: ArtifactDetailPageProps) {
    const { artifactId } = params;

    return <ArtifactDetail artifactId={artifactId} />;
}
