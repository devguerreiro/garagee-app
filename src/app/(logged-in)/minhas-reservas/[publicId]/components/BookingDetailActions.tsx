"use client";

import { BookingDetailDTO, BookingStatusDTO } from "@/app/dtos";

import { useCurrentUser } from "@/hooks/use-current-user";

import BookingRevokeAlertDialog from "./BookingRevokeAlertDialog";
import BookingApproveAlertDialog from "./BookingApproveAlertDialog";
import BookingRefuseAlertDialog from "./BookingRefuseAlertDialog";

type Props = {
  booking: BookingDetailDTO;
};

export default function BookingDetailActions({ booking }: Readonly<Props>) {
  const bookingClaimant = booking.claimant_id;
  const parkingSpaceOwner = booking.parking_space.apartment.occupant.public_id;

  const { isCurrentUser: isBookingClaimant } = useCurrentUser(bookingClaimant);
  const { isCurrentUser: isParkingSpaceOwner } =
    useCurrentUser(parkingSpaceOwner);

  if (
    isBookingClaimant &&
    [BookingStatusDTO.APPROVED, BookingStatusDTO.PENDING].includes(
      BookingStatusDTO[booking.status]
    )
  )
    return <BookingRevokeAlertDialog booking={booking} />;
  else if (
    isParkingSpaceOwner &&
    BookingStatusDTO.PENDING === BookingStatusDTO[booking.status]
  )
    return (
      <div className="!mt-12 space-y-4">
        <BookingApproveAlertDialog booking={booking} />
        <BookingRefuseAlertDialog booking={booking} />
      </div>
    );
}
