import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <div className="flex justify-center items-center h-full text-gray-500">
      <p className="text-lg">
        サイドバーからルームを選択し、チャットを始めましょう！
      </p>
    </div>
  );
}
