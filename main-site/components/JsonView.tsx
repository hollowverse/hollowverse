import dynamic from 'next/dynamic';

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
});

// Used to render JSON data in React during
// development
export function JsonView(props: { src: any; collapsed?: number }) {
  return (
    <ReactJson collapsed={props.collapsed || 2} src={props.src} name={false} />
  );
}
