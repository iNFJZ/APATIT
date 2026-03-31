declare module "pandoc-wasm" {
  export type PandocConvertFiles = Record<string, string | Blob>;

  export type PandocConvertResult = {
    stdout: string;
    stderr: string;
    warnings: unknown[];
    files: PandocConvertFiles;
    mediaFiles: Record<string, Blob>;
  };

  export type PandocConvertOptions = Record<string, unknown>;

  export function convert(
    options: PandocConvertOptions,
    stdin: string | null,
    files: PandocConvertFiles,
  ): Promise<PandocConvertResult>;
}
