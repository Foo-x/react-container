export type UseHooksProps<Props> = {
  props: Props;
};
export type UseHooks<Props, HooksResult> = (
  useHooksProps: UseHooksProps<Props>
) => HooksResult;

export type ViewProps<Props, HooksResult> = {
  props: Props;
  hooksResult: HooksResult;
};
export type View<Props, HooksResult> = React.VFC<ViewProps<Props, HooksResult>>;

export type ContainerProps<Props, HooksResult> = {
  view: View<Props, HooksResult>;
  useHooks: UseHooks<Props, HooksResult>;
  /** The name of the component used in debugging messages. */
  displayName?: string;
};
export const Container = <Props, HooksResult>({
  view,
  useHooks,
  displayName,
}: ContainerProps<Props, HooksResult>) => {
  const ContainerComponent = (props: Props) => {
    const hooksResult = useHooks({ props });
    const viewProps = {
      props,
      hooksResult,
    };
    return view({ ...viewProps });
  };
  if (displayName) {
    ContainerComponent.displayName = displayName;
  }
  return ContainerComponent;
};
