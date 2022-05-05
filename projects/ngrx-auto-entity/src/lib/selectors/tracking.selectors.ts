import { IEntityTracking } from '../util/entity-state';

// prettier-ignore
export const mapToHasBeenLoaded =
  (tracking: IEntityTracking): boolean =>
    tracking?.loadedAt != null;

// prettier-ignore
export const mapToLoadWasAttempted =
  (tracking: IEntityTracking): boolean =>
    tracking?.isLoading != null;

// prettier-ignore
export const mapToIsLoading =
  (tracking: IEntityTracking): boolean =>
    !tracking ? false : !!tracking.isLoading;

// prettier-ignore
export const mapToIsSaving =
  (tracking: IEntityTracking): boolean =>
    !tracking ? false : !!tracking.isSaving;

// prettier-ignore
export const mapToIsDeleting =
  (tracking: IEntityTracking): boolean =>
    !tracking ? false : !!tracking.isDeleting;

// prettier-ignore
export const mapToLoadedAt =
  (tracking: IEntityTracking): Date | undefined =>
    (!tracking || !tracking.loadedAt) ? undefined : new Date(tracking.loadedAt);

// prettier-ignore
export const mapToSavedAt =
  (tracking: IEntityTracking): Date | undefined =>
    (!tracking || !tracking.savedAt) ? undefined : new Date(tracking.savedAt);

// prettier-ignore
export const mapToCreatedAt =
  (tracking: IEntityTracking): Date | undefined =>
    (!tracking || !tracking.createdAt) ? undefined : new Date(tracking.createdAt);

// prettier-ignore
export const mapToUpdatedAt =
  (tracking: IEntityTracking): Date | undefined =>
    (!tracking || !tracking.updatedAt) ? undefined : new Date(tracking.updatedAt);

// prettier-ignore
export const mapToReplacedAt =
  (tracking: IEntityTracking): Date | undefined =>
    (!tracking || !tracking.replacedAt) ? undefined : new Date(tracking.replacedAt);

// prettier-ignore
export const mapToDeletedAt =
  (tracking: IEntityTracking): Date | undefined =>
    (!tracking || !tracking.deletedAt) ? undefined : new Date(tracking.deletedAt);
