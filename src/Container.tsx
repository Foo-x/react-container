type None = null | undefined;
type NullObject = Record<string, never> | None | never;
type MergeIfExists<
  ToCheck,
  T extends Record<string, unknown>,
  MergedKey extends string,
  MergedValue
> = [ToCheck] extends [NullObject] ? T : T & { [k in MergedKey]: MergedValue };

export type UseHooksProps<Props> = {
  props: Props;
};
export type UseHooks<Props, HooksResult> = (
  useHooksProps: UseHooksProps<Props>
) => HooksResult;

export type ViewProps<Props, HooksResult = never> = MergeIfExists<
  HooksResult,
  {
    props: Props;
  },
  'hooksResult',
  HooksResult
>;
export type View<Props, HooksResult = never> = React.VFC<
  ViewProps<Props, HooksResult>
>;

export type ContainerProps<Props, HooksResult = never> = MergeIfExists<
  HooksResult,
  {
    view: View<Props, HooksResult>;
  },
  'useHooks',
  UseHooks<Props, HooksResult>
>;
export const Container = <Props, HooksResult = never>(
  containerProps: ContainerProps<Props, HooksResult>
) => {
  const { view } = containerProps;
  const useHooks = (() => {
    if ('useHooks' in containerProps) {
      return containerProps.useHooks;
    }
    return () => ({} as HooksResult);
  })();

  const ContainerComponent = (props: Props) => {
    const hooksResult = useHooks({ props });
    const viewProps = {
      props,
      hooksResult,
    };
    return view({ ...viewProps });
  };
  return ContainerComponent;
};
