import Avatar from "../../molecules/avatar";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";

const TopbarUser = () => {
  const { data: user, error } = useSWR(`/api/users/`, fetcher);

  if (error) return "An error has occurred.";
  if (!user) return "Loading...";

  return (
    <div className="flex items-center">
      <Avatar />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {user.firstName} {user.lastName}
        </p>

        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
          {user.organization.name}
        </p>
      </div>
    </div>
  );
};

export default TopbarUser;
