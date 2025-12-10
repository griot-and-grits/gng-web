import Collections from '@/components/collections';
import Nav from '@/components/nav';
import { loadVideoMetadata, loadFilterMetadata } from '@/lib/load-metadata';
import { isFeatureEnabled } from '@/lib/feature-flags';

export default function CollectionsPage() {
    const videoMetadata = loadVideoMetadata();
    const filterMetadata = loadFilterMetadata();
    const askTheGriotEnabled = isFeatureEnabled('askTheGriot');

    return (
        <>
            <Nav />
            <Collections
                videos={videoMetadata.videos}
                filters={filterMetadata}
                askTheGriotEnabled={askTheGriotEnabled}
            />
        </>
    );
}